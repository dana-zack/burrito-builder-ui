describe("User flows", () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/orders', {
      statusCode: 200,
      fixture: 'mock-orders'
    })
    cy.visit("http://localhost:3000/")
  })

  it('loads the home page and all expected elements', () => {
    cy.get('h1').contains('Burrito Builder')
    cy.get('input[name=name]').should('have.value', '')
    cy.get('.ing-btn').should('have.length', 12)
    cy.get('.ing-btn').contains('beans')
    cy.get('.ing-btn').contains('steak')
    cy.get('.ing-btn').contains('carnitas')
    cy.get('.ing-btn').contains('sofritas')
    cy.get('.ing-btn').contains('lettuce')
    cy.get('.ing-btn').contains('queso fresco')
    cy.get('.ing-btn').contains('pico de gallo')
    cy.get('.ing-btn').contains('hot sauce')
    cy.get('.ing-btn').contains('guacamole')
    cy.get('.ing-btn').contains('jalapenos')
    cy.get('.ing-btn').contains('cilantro')
    cy.get('.ing-btn').contains('sour cream')
    cy.get('.order-msg').contains('Order: Nothing selected')
    cy.get('.submit-btn').contains('Submit Order')
    cy.get('.orders-container').children().should('have.length', 3)
    cy.get('.order').first().contains('Mock Pat')
    cy.get('.order').first().contains('beans')
    cy.get('.order').first().contains('lettuce')
    cy.get('.order').last().contains('Mock Alex')
    cy.get('.order').last().contains('sofritas')
    cy.get('.order').last().contains('beans')
    cy.get('.order').last().contains('sour cream')
    cy.get('.App').should('have.css', 'background-image')
  });

  it('posts a new order and displays it on the DOM', () => {
    cy.intercept('POST', 'http://localhost:3001/api/v1/orders', {
      statusCode: 201,
      body: {'id': 4, 'name': 'Mock Cody', 'ingredients': ['hot sauce', 'steak']}
    }).as('postOrder')

    cy.get('.orders-container').children().should('have.length', 3)
    cy.get('input[name=name]').type('Mock Cody').should('have.value', 'Mock Cody')
    cy.get('.ing-btn').contains('hot sauce').click()
    cy.get('.order-msg').contains('Order: hot sauce')
    cy.get('.ing-btn').contains('steak').click()
    cy.get('.order-msg').contains('Order: hot sauce, steak')
    cy.get('.submit-btn').click()
    
    cy.wait('@postOrder')

    cy.get('.orders-container').children().should('have.length', 4)
    cy.get('.order').first().contains('Mock Pat')
    cy.get('.order').first().contains('beans')
    cy.get('.order').first().contains('lettuce')
    cy.get('.order').last().contains('Mock Cody')
    cy.get('.order').last().contains('hot sauce')
    cy.get('.order').last().contains('steak')
  });

  it('prevents order submission if name field is incomplete and/or no ingredients have been selected', () => {
    cy.get('.orders-container').children().should('have.length', 3)

    cy.get('.submit-btn').click()
    cy.get('.alert-msg').contains('Please fill out the name field before continuing')
    cy.get('.orders-container').children().should('have.length', 3)

    cy.get('input[name=name]').type('Mock Cody').should('have.value', 'Mock Cody')
    cy.get('.order-msg').contains('Order: Nothing selected')
    cy.get('.submit-btn').click()
    cy.get('.alert-msg').contains('Please select at least one ingredient before continuing')
    cy.get('.orders-container').children().should('have.length', 3)

    cy.get('input[name=name]').clear().should('have.value', '')
    cy.get('.ing-btn').contains('hot sauce').click()
    cy.get('.order-msg').contains('Order: hot sauce')
    cy.get('.submit-btn').click()
    cy.get('.alert-msg').contains('Please fill out the name field before continuing')
    cy.get('.orders-container').children().should('have.length', 3)
  });
});
