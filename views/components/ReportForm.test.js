/* globals test */

const expect = require('unexpected')

test('renders', function(ctx) {
  const out = ctx.render()
  expect(out.html, 'to contain', 'foo')
  expect(out.html, 'to contain', 'bar')
})
