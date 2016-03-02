'use strict';
const arrify = require('arrify');
const assignDeep = require('assign-deep');
const isPlainObject = require('is-plain-object');
const classNames = require('classnames');

const ID_CLASS_REGEX = /(#|\.)[^#\.]+/g;
const SNABBDOM_KEYS = ['sel', 'data', 'children', 'text', 'elm', 'key'];

module.exports = exports = function normalize(options) {
	options = options || {};
	const mode = getMode(options);
	return fn => {
		return (first, second, third) => {
			let props = {};
			if (isSelector(first)) {
				props = getIdAndClassName(mode, first);
			} else if (isChildren(mode, first)) {
				return fn({}, arrify(first));
			} else {
				props = first;
			}
			if (isChildren(mode, second)) {
				return fn(props, arrify(second));
			}
			props = mergeProps(mode, props, second);
			return fn(props, arrify(third));
		};
	};
};

function getMode(options) {
	if (options.snabbdom) {
		return 'snabbdom';
	} else if (options.dom === false) {
		return 'nodom';
	}
	return 'dom';
}

function isChildren(mode, val) {
	return Array.isArray(val) ||
		typeof val === 'string' ||
		typeof val === 'number' ||
		!isPlainObject(val) ||
		typeof val === 'object' &&
		(
			mode === 'dom' &&
			typeof val.tagName === 'string' ||
			mode === 'snabbdom' &&
			Object.keys(val).every(key => SNABBDOM_KEYS.indexOf(key) !== -1)
		);
}

function mergeProps(mode, props1, props2) {
	const propName = getClassNameProp(mode);
	if (mode === 'snabbdom') {
		return assignDeep(
			{},
			props1,
			props2,
			{
				props: {
					[propName]: classNames(
						props1.props && props1.props[propName],
						props2.props && props2.props[propName]
					)
				}
			}
		);
	}
	return Object.assign(
		{},
		props1,
		props2,
		{
			[propName]: classNames(props1[propName], props2[propName])
		}
	);
}

function getClassNameProp(mode) {
	if (mode === 'nodom') {
		return 'class';
	}
	return 'className';
}

function isSelector(val) {
	return typeof val === 'string' && (isClass(val) || isId(val));
}

function getIdAndClassName(mode, str) {
	const matches = str.match(ID_CLASS_REGEX);
	const propName = getClassNameProp(mode);
	const props = {
		id: matches.filter(isId).map(slice(1))[0],
		[propName]: matches.filter(isClass).map(slice(1)).join(' ')
	};
	if (mode === 'snabbdom') {
		return {props};
	}
	return props;
}

function slice(a, b) {
	return val => val.slice(a, b);
}

function isId(str) {
	return str[0] === '#';
}

function isClass(str) {
	return str[0] === '.';
}
