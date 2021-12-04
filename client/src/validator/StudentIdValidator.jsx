const StudentIdValidator = (Id) => {
    if (Id.length !== 8) {
        return false;
    } else {
        return true;
    }
};

export default StudentIdValidator;
