import { expect } from "chai";
import Route from "./Route";
import Block from "./Block";

describe('Route', () => {
    let BlockClass: typeof Block;
    let route: Route;
    
    before(() => {
        class Page extends Block {
          render(): string {
                return `<div></div>`
            }
        };

        BlockClass = Page;
    })
    
    beforeEach(()=>{
        route = new Route('/test', BlockClass, { rootQuery: '#app' });
    });
        
    it('match method retrun route', () => {
        expect(route.match('/test')).to.be.true
    });

    it('fake route do not work', () => {
        expect(route.match('/fakeroute')).to.be.false
    });
        
    it('navigate is correctly', () => {
        route.navigate('/test');
    });

    it('leave is correctly', () => {
        route.leave();
    });
    
})
