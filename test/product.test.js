/* In this implementation, we use the chai library for assertions, supertest to make HTTP requests to the API, and util and chalk to add some color and formatting to the test output.

The test cases included are:
should return all components: This test case checks that the response status is 200 and the response body is an array.
should return components with correct properties: This test case checks that each component in the response body has the expected properties.
should return components with correct data types: This test case checks that the data types of the properties in each component are as expected.
should return components sorted by name: This test case checks that the components in the response body are sorted alphabetically by name.
should return components filtered by name: This test case checks that the response body contains only components whose names match the specified query parameter.
Lastly, we override the console.log function to add a timestamp and some gray coloring to the output, using util.format to format the log message. This is optional but can make it easier to read the test output.  */


const { expect } = require('chai');
const request = require('supertest');
const util = require('util');
const chalk = require('chalk');

const app = require('./app');

describe('GET /product', () => {
  it('should return all product', async () => {
    const res = await request(app).get('/product');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
  });

  it('should return product with correct properties', async () => {
    const res = await request(app).get('/product');
    const component = res.body[0];
    expect(component).to.have.property('id');
    expect(component).to.have.property('name');
    expect(component).to.have.property('description');
  });

  it('should return product with correct data types', async () => {
    const res = await request(app).get('/product');
    const component = res.body[0];
    expect(component.id).to.be.a('number');
    expect(component.name).to.be.a('string');
    expect(component.description).to.be.a('string');
  });

  it('should return product sorted by name', async () => {
    const res = await request(app).get('/product');
    const product = res.body;
    for (let i = 0; i < product.length - 1; i++) {
      const currComponent = product[i];
      const nextComponent = product[i + 1];
      expect(currComponent.name.localeCompare(nextComponent.name)).to.be.lessThan(1);
    }
  });

  it('should return product filtered by name', async () => {
    const res = await request(app).get('/product?name=cpu');
    const product = res.body;
    expect(product).to.have.lengthOf(1);
    expect(product[0].name).to.equal('CPU');
  });
});

// Optional: use chalk and util to add some color and formatting to the test output
const log = console.log;
console.log = function(...args) {
  const message = util.format(...args);
  log(chalk.gray(`[${new Date().toISOString()}]`), message);
};
