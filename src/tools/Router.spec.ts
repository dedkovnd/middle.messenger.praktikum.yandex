import { expect } from "chai";
import sinon from "sinon";
import Router from "./Router";
import Block from "./Block";

describe('Router', () => {
    let BlockClass: typeof Block;
    let router: Router;
    
    before(() => {
        class Page extends Block {
            render(): string {
                return `<div></div>`
            }
        };

        BlockClass = Page;
    })

    beforeEach(()=>{
        router = new Router('#app');
        router.use('/', BlockClass)
    })
    it('Create new route, use is working', ()=> {
        router.use('/test', BlockClass)
        expect(router.getRoute('/test')).not.undefined;
    })

    it('method go is working', () => {
        const go = sinon.stub(window.history, 'pushState')
        router.use('/test', BlockClass)
        router.go('/test')
        expect(go.calledWith({}, '', '/test')).to.be.true
    });

    it('method back is working', ()=> {
        const back = sinon.stub(window.history, 'back')
        router.back()
        expect(back.called).to.be.true
    })

      it('method forward is working', ()=> {
        const forward = sinon.stub(window.history, 'forward')
        router.forward()
        expect(forward.called).to.be.true
      })
   
})
