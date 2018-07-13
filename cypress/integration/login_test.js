/* global describe, cy, it */
describe('软电话登录', function () {
  it('软电话登录测试', function () {
    cy.visit('https://mbtpi.wellcloud.cc/phone/index.html')

    cy.get('#config-env').select('CMB-TEST')
    cy.get('#config').click()

    cy.get('#well-code').type('5888')
    cy.get('#well-password').type('Aa123456')
    cy.get('#well-namespace').type('cc.qq')
    cy.get('#well-deviceId').type('8888')

    cy.get('#well-login').click()

    cy.wait(3000)
    cy.get('#well-login').should('not.be.visible')
  })
})
