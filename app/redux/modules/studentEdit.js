import { fromJS, List } from 'immutable';
import {
    STORE_PERSONAL_DETAILS_INFO,
    STORE_SKILLS_INTERESTS_INFO,
    STORE_EDUCATION_INFO,
    STORE_EXPERIENCE_INFO
} from 'dan-actions/actionConstants';

const initialState = {
    fistName: '',
    lastName: '',
    alternativeEmail: '',
    phoneNumber: '',
    ethnicity: '',
    nationality: '',
    //reusume:'',
    interestedIndustries: List([]),
    interestedCompanies: List([]),
    iSkills: List([]),
    institute: List([]),
    qualification: List([]),
    startYear: List([]),
    endYear: List([]),
    gradeAchieved: List([]),
    company: '',
    role: '',
    roleDescription: '',
    eSkills: List([])
};
const initialImmutableState = fromJS(initialState);
export default function reducer(state = initialImmutableState, action = {}) {
    switch (action.type) {
        case STORE_PERSONAL_DETAILS_INFO:
            return state.withMutations((mutableState) => {
                mutableState

            });

        case STORE_SKILLS_INTERESTS_INFO:
            return state.withMutations((mutableState) => {
                mutableState

            });

        case STORE_EDUCATION_INFO:
            return state.withMutations((mutableState) => {
                mutableState

            });
        case STORE_EXPERIENCE_INFO:
            return state.withMutations((mutableState) => {
                mutableState

            });
    }
}
