import sinon, { SinonStub } from 'sinon';
import { HTTPTransport, METHOD } from './HTTPTransport';
import { expect } from "chai";


describe('HttpTransport', () => {
    let http: HTTPTransport;
    let requestStub: SinonStub;

    beforeEach(() => {
        http = new HTTPTransport('');
        requestStub = sinon.stub(http,'request').callsFake(()=>Promise.resolve())
    });

    it('test to get HTTP', () => {
        http.get('/test');
        expect(requestStub.calledOnce).to.be.true
        expect(requestStub.calledWithMatch('/test', {method: METHOD.GET})).to.be.true;
    });
    
    it('test to put HTTP', () => {
        http.put('/test');
        expect(requestStub.calledOnce).to.be.true
        expect(requestStub.calledWithMatch('/test', {method: METHOD.PUT})).to.be.true;
    });

    it('test to post HTTP', () => {
        http.post('/test');
        expect(requestStub.calledOnce).to.be.true
        expect(requestStub.calledWithMatch('/test', {method: METHOD.POST})).to.be.true;
    });

    it('test to post HTTP', () => {
        http.delete('/test');
        expect(requestStub.calledOnce).to.be.true
        expect(requestStub.calledWithMatch('/test', {method: METHOD.DELETE})).to.be.true;
    });

})
