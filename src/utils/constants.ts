
import { faker } from '@faker-js/faker';

export const ERRORS = {
    ERROR_FIRST_NAME_IS_INVALID: 'Name is invalid',
    ERROR_FIRST_NAME_LENGTH: 'Name has to be from 2 to 20 characters long',
    ERROR_FIRST_NAME_REQUIRED: 'Name required',
    ERROR_LAST_NAME_REQUIRED: 'Last name required',
    ERROR_LAST_NAME_IS_INVALID: 'Last name is invalid',
    ERROR_LAST_NAME_LENGTH: 'Last name has to be from 2 to 20 characters long',
    ERROR_EMAIL_REQUIRED: 'Email required',
    ERROR_PASSWORD_REQUIRED: 'Password required',
    ERROR_REENTER_PASSWORD_REQUIRED: 'Re-enter password required',
    ERROR_INCORRECT_PASSWORD: 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter',
}
export const VALID_DATA = {
    FIRST_NAME: 'Jane',
    LAST_NAME: 'Peeker',
    EMAIL:  `aqa_${faker.internet.userName()}@gmail.com`,
    PASSWORD: 'Jane_123!',
}
export const INVALID_DATA = {
    SHORT_NAME: 'A',
    LONG_NAME: 'Very long long long name',
}
