import test from 'ava';
import vh from 'virtual-dom/h';
import h from 'hyperscript';
import normalize from '../src';

const vdiv = (...args) => vh('div', ...args);
const div = (...args) => h('div', ...args);
const n = normalize();

test('selector', t => {
	t.plan(3);
	const component = n((props, children, ...rest) => {
		t.same(props, {id: 'main', className: 'my-class'});
		t.same(children, []);
		t.is(rest.length, 0);
	});
	component('#main.my-class');
});

test('selector, props', t => {
	t.plan(3);
	const component = n((props, children, ...rest) => {
		t.same(props, {id: 'main', className: 'my-class', disabled: true});
		t.same(children, []);
		t.is(rest.length, 0);
	});
	component('#main.my-class', {disabled: true});
});

test('selector, children', t => {
	t.plan(3);
	const component = n((props, children, ...rest) => {
		t.same(props, {id: 'main', className: 'my-class'});
		t.same(children, ['Hello world!']);
		t.is(rest.length, 0);
	});
	component('#main.my-class', 'Hello world!');
});

test('selector, props, children', t => {
	t.plan(3);
	const component = n((props, children, ...rest) => {
		t.same(props, {id: 'main', className: 'my-class another-class', disabled: true});
		t.same(children, ['Hello world!']);
		t.is(rest.length, 0);
	});
	component('#main.my-class', {className: 'another-class', disabled: true}, 'Hello world!');
});

test('children', t => {
	t.plan(3);
	const component = n((props, children, ...rest) => {
		t.same(props, {});
		t.same(children, ['Hello world!']);
		t.is(rest.length, 0);
	});
	component('Hello world!');
});

test('children (array)', t => {
	t.plan(3);
	const component = n((props, children, ...rest) => {
		t.same(props, {});
		t.same(children, ['Hello world!']);
		t.is(rest.length, 0);
	});
	component(['Hello world!']);
});

test('children (virtual element)', t => {
	t.plan(3);
	const child = vdiv('Hello world!');
	const component = n((props, children, ...rest) => {
		t.same(props, {});
		t.same(children, [child]);
		t.is(rest.length, 0);
	});
	component(child);
});

test('children (element)', t => {
	t.plan(3);
	const child = div('Hello world!');
	const component = n((props, children, ...rest) => {
		t.same(props, {});
		t.same(children, [child]);
		t.is(rest.length, 0);
	});
	component(child);
});

test('props, children', t => {
	t.plan(3);
	const component = n((props, children, ...rest) => {
		t.same(props, {className: 'my-div'});
		t.same(children, ['Hello world!']);
		t.is(rest.length, 0);
	});
	component({className: 'my-div'}, 'Hello world!');
});

test('props, children (virtual element)', t => {
	t.plan(3);
	const child = vdiv('Hello world!');
	const component = n((props, children, ...rest) => {
		t.same(props, {className: 'my-div'});
		t.same(children, [child]);
		t.is(rest.length, 0);
	});

	component({className: 'my-div'}, child);
});

test('props, children (element)', t => {
	t.plan(3);
	const child = div('Hello world!');
	const component = n((props, children, ...rest) => {
		t.same(props, {className: 'my-div'});
		t.same(children, [child]);
		t.is(rest.length, 0);
	});

	component({className: 'my-div'}, child);
});

test('props', t => {
	t.plan(3);
	const component = n((props, children, ...rest) => {
		t.same(props, {className: 'my-div'});
		t.same(children, []);
		t.is(rest.length, 0);
	});
	component({className: 'my-div'});
});
