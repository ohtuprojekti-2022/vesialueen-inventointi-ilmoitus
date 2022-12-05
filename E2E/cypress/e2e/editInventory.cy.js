describe('Editing inventory reports', () => {
  // Editing reports is only for logged-in users
  // Tests always start with a report and as logged-in
	beforeEach(() => {
		const existing_user = {
			username: 'existing_user',
			password: 'password123',
			email: 'cypress@test.mail',
			phone: '',
			name: ''
		}

		cy.resetDatabase()
    cy.visit('/')
    
		cy.registerUser(existing_user)
    cy.loginWith(existing_user.username, existing_user.password)

    // Fix so the site loads before the next step
    cy.wait(500)

    cy.navigateToNewInventoryForm()

    cy.drawPolygon([
        { x: 180, y: 100 },
        { x: 180, y: 50 },
        { x: 150, y: 70 },
        { x: 180, y: 100 }
    ])

    cy.get('#inventorydate').type('2022-01-06')
    cy.getByTestId("other").click()
    cy.getByTestId("methodInfo").type('lentokone')
    cy.getByTestId("moreInfo").type('ei löytynyt mitään')
    cy.getByTestId("submit").click()

    cy.url().should('include', '/raportti/')

    cy.navigateToFrontpage()
	})

  it('Logged-in user can request an edit for their already made report', () => {
    // Check that there is a report
    cy.navigateToUserPage()
    cy.getByTestId("own-inventories").click()
    cy.url().should('include', '/omasivu#inventoinnit')
    // Open the report
    cy.get('table').contains('td', 'lentokone').click()
    cy.url().should('include', '/raportti/')
    // Start editing the report
    cy.contains('button', 'Muokkaa').click()
    cy.url().should('include', '/muokkaa')
    // Change the shape of the polygon (Does not check if there are changes made)
    cy.get('.leaflet-draw-edit-edit').click()
    cy.get('.leaflet-marker-icon:nth-child(5)').trigger("mouseover")
    .trigger("mousedown", { which: 1})
    .trigger("mousemove", {clientX: 530, clientY: 60, screenX: 530, screenY: 60, pageX: 530, pageY: 60 })
    .trigger("mouseup", { which: 1 })
    cy.get('.leaflet-draw-actions > :nth-child(1) > a').click()
    // Move forward and change the details regarding the report
    cy.contains('button', 'Seuraava').click()
    cy.getByTestId("moreInfo").clear()
    cy.getByTestId("moreInfo").type('löytyi auto')
    cy.getByTestId("editReason").type('alueen koko oli väärä')
    // Request the change
    cy.contains('button', 'Pyydä muokkausta').click()
    cy.contains('button', 'Lähetä').click()
    // Check to make sure the report did not change yet
    cy.contains('ei löytynyt mitään')
    // Check the change request and confirm the changes are there
    cy.contains('button','Tarkista pyyntö').click()
    cy.url().should('include', '/muokatut/')
    cy.get('tbody > :nth-child(5) > :nth-child(2)').contains('ei löytynyt mitään')
    cy.get(':nth-child(5) > :nth-child(3)').contains('löytyi auto')
    cy.contains('alueen koko oli väärä')
    // Cancel the request and check the request disappeared
    cy.contains('button', 'Peruuta muokkauspyyntö').click()
    cy.contains('button','Tarkista pyyntö').should('not.exist')
  })

  it('Logged-in user can request deletion of their report', () => {
    // Check that there is a report
    cy.navigateToUserPage()
    cy.getByTestId("own-inventories").click()
    cy.url().should('include', '/omasivu#inventoinnit')
    // Open the report
    cy.get('table').contains('td', 'lentokone').click()
    cy.url().should('include', '/raportti/')
    // Open request form, give a reason and request
    cy.contains('button', 'Pyydä poistoa').click()
    cy.get('[data-testid="deleteReason"]').type('raportti on tehty huonosti')
    cy.contains('button', 'Pyydä inventoinnin poistoa').click()
    // Check that the request went through
    cy.contains('Poiston syy: raportti on tehty huonosti')
    cy.contains('button', 'Pyydä poistoa').should('not.exist')
    // Cancel the request
    cy.contains('button', 'Hylkää poistopyyntö').click()
    cy.contains('button', 'Pyydä poistoa')
  })

  it('Logged-in user has no reports on its own inventories page', () => {
    const existing_user = {
    username: 'existing_user2',
    password: 'password123',
    email: 'cypress2@test.mail',
    phone: '',
    name: ''
  }

  // Logout before each account
  cy.navigateToUserPage()
  cy.getByTestId('logged-in-user-dropdown').contains('Kirjaudu ulos').then(option => {
    option[0].click()
  })

  cy.registerUser(existing_user)
  cy.loginWith(existing_user.username, existing_user.password)
  
  // Fix so the site loads before the next step
  cy.wait(500)
  
  // Check that there is no reports
  cy.navigateToUserPage()
  cy.getByTestId("own-inventories").click()
  cy.url().should('include', '/omasivu#inventoinnit')
  cy.contains('Et ole vielä tehnyt inventointeja')
  })
})