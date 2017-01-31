export function navigateToNextSlide(current) {
    var nextComponent = null;
    var label = '';
    switch (current) {
        case City:
            nextComponent = 'Gender';
            label = "My gender";
            break;
        case Gender:
            nextComponent = 'Experience';
            label = "Your joining date and total work experience";
            break;
        case Experience:
            nextComponent = 'Salary';
            label = "Your monthly net salary";
            break;
        default:
            nextComponent = 'Gender';
            label = 'My gender';
    }
    return {activeComponent:  nextComponent, activeComponentLabel: label};
}

export function navigateToPreviousSlide(current) {
    var prevComponent = null;
    var label = '';
    switch (current) {
        case 'Gender':
            prevComponent = 'City';
            label = 'Where do you live currently?';
            break;
        case 'Experience':
            prevComponent = 'Gender';
            label = "My gender";
            break;
        case 'Salary':
            prevComponent = 'Experience';
            label = "Your joining date and total work experience";
            break;
        default:
            prevComponent = 'Gender';
            label = 'My gender';
    }
    return {activeComponent:  prevComponent, activeComponentLabel: label};
}

export function navigateToNextSlideIfCurrSlideValid() {
    if (!this.activeComponentInstance.isInValidState()) {
        console.log("Oopss... You have not chosen anything");
        return;
    }
    navigateToNextSlide();
}