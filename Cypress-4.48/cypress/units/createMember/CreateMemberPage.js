

export class CreateMemberPage {
  constructor(cy) {
    if (!cy) {
      throw new Error("Es requerida la instancia de cypress");
    }
    this.cy = cy;
  }

  navigateToMembers() {
    cy.visit('/ghost/#/members');

}

getNewMemberButton() {
    return this.cy.contains('a', 'New member')

}
getMemberNameInput() {
    return this.cy.get('input#member-name[name="name"][type="text"]');
}
getMemberEmailInput() {
    return this.cy.get('input[type="text"][name="email"]');
}
getSaveButton() {
    return this.cy.contains('button', 'Save');
}

getEmberPowerSelectInput() {
    return this.cy.get('.ember-power-select-trigger-multiple-input');
}

getMemberNoteTextarea() {
    return this.cy.get('textarea#member-note[name="note"]');
}
getMembersBackLink() {
    return this.cy.get('a[data-test-link="members-back"]');
}
getStayButton() {
    return this.cy.contains('button.gh-btn', 'Stay');
}

getLeaveButton() {
    return this.cy.contains('button.gh-btn.gh-btn-red', 'Leave');
  }


memberExists(memberEmail) {
    return this.cy.get('table.gh-list').contains('tr', memberEmail).then($el => {
        return $el.length > 0;
    });
}

getLabelMember(){
    return this.cy.get('.ember-power-select-trigger-multiple-input');    ;

}
memberDoesNotExist(memberEmail) {
    return this.cy.get('table.gh-list').then($table => {
        // Si la tabla no contiene el email, pasa la aserción
        if ($table.find(`tr:contains('${memberEmail}')`).length === 0) {
            return true;
        } else {
            throw new Error("El miembro existe en la lista");
        }
    });
}

}