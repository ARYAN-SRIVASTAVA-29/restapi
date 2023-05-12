const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./server'); 
const should = chai.should();

chai.use(chaiHttp);

describe('Products', () => {
    describe('/GET products', () => {
        it('it should GET all the products', (done) => {
            chai.request(server)
                .get('/products')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });
});
