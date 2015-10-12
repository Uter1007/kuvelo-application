/**
 * Created by Christoph on 12.10.2015.
 */
describe('Home Screen Tests', function() {

    it('get Messages', function() {

        browser.ignoreSynchronization = true;

        browser.get('http://sumowin.cloudapp.net:4490/');

        browser.driver.sleep(3000);

        browser.waitForAngular();


        element.all(by.repeater('message in messages')).count().then(function(count) {
            console.log(count);

            expect(count).
                toBeGreaterThan(0);

        });
    });
});