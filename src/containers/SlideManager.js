import Gender from '../components/Gender.js';
import City from '../components/City.js';
import Experience from '../components/Experience.js';
import Salary from '../components/Salary.js';

export default class SlideManager {
    static firstSlide() {
        return City;
    }

    static nextSlide(currentSlide) {
        var nextComponent = null;
        switch (currentSlide) {
            case City:
                nextComponent = Gender;
                break;
            case Gender:
                nextComponent = Experience;
                break;
            case Experience:
                nextComponent = Salary;
                break;
            default:
                nextComponent = City;
        }
        return nextComponent;
    }

    static previousSlide(currentSlide) {
        var prevComponent = null;
        switch (currentSlide) {
            case Gender:
                prevComponent = City;
                break;
            case Experience:
                prevComponent = Gender;
                break;
            case Salary:
                prevComponent = Experience;
                break;
            default:
                prevComponent = Gender;
        }
        return prevComponent;
    }

    static slideHeader(currentSlide) {
        switch (currentSlide) {
            case City:
                return "Where do you live currently?";
            case Experience:
                return "Your joining date and total work experience";
            case Gender:
                return "My gender";
            case Salary:
                return "Your monthly net salary";
            default:
                return "Oops... Are you sure this can happen?";
        }
    }
}
