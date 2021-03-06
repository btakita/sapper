import * as assert from 'assert';
import { build } from '../../../api';
import { AppRunner } from '../AppRunner';

describe('custom extensions', function() {
	this.timeout(10000);

	let r: AppRunner;

	// hooks
	before('build app', () => build({ cwd: __dirname , ext: '.jesuslivesineveryone .whokilledthemuffinman .route.svelte .mdx .svelte' }));
	before('start runner', async () => {
		r = await new AppRunner().start(__dirname);
	});

	after(() => r && r.end());


	
	it('works with arbitrary extensions', async () => {
		await r.load('/');


		assert.strictEqual(
			await r.text('h1'),
			'Great success!'
		);
	});

	it('works with other arbitrary extensions', async () => {
		await r.load('/const');

		assert.strictEqual(
			await r.text('h1'),
			'Tremendous!'
		);

		await r.load('/a');

		assert.strictEqual(
			await r.text('h1'),
			'a'
		);

		await r.load('/test-slug');

		assert.strictEqual(
			await r.text('h1'),
			'TEST-SLUG'
		);

		await r.load('/unsafe-replacement');

		assert.strictEqual(
			await r.text('h1'),
			'Bazooom!'
		);

		await r.load('/ide-friendly');

		assert.equal(
			await r.text('h1'), 
			'Great success, IDE friendly custom extensions!'
		);
	});

	
});
