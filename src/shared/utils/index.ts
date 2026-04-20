// src/shared/utils/index.ts

// Validators
export {
    isValidEmail,
    isValidPhone,
    isValidPassword,
    isStrongPassword,
    isValidName,
    isValidPincode,
    isValidUrl,
    isValidPan,
    isValidGST,
    isEmpty,
    isNumber,
    isAlphabet,
    isAlphanumeric,
} from './validators';

// Formatters
export {
    formatDate,
    formatDateTime,
    formatTime,
    getRelativeTime,
    formatCurrency,
    formatCurrencyWithDecimal,
    formatNumber,
    formatCompactNumber,
    capitalizeFirstLetter,
    capitalizeWords,
    truncateText,
    getInitials,
    toLowerCase,
    toUpperCase,
    trimText,
} from './formatters';

// Helpers
export {
    debounce,
    throttle,
    delay,
    sleep,
    deepClone,
    isObjectEmpty,
    generateId,
    uniqueArray,
    shuffleArray,
    getErrorMessage,
    isIOS,
    isAndroid,
} from './helpers';