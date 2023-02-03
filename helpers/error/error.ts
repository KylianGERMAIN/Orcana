export enum CustomErrorMessage {
    /**     USER     **/
    NO_USER = "The user does not exist",
    NO_USER_WITH_ID = "The user with the id does not exist",

    /**     Name     **/
    NAME_LENGTH = "Your name length must be at least 7 characters",
    USERNAME_NO_EXIST = "username does not exist",

    /**     Email     **/
    INVALID_EMAIL = "Your email is not valid",
    EMAIL_ALREADY_EXIST = "The email already exist",

    /**     Password     **/
    PASSWORD_LENGTH = "Your password length must be at least 7 characters",
    BAD_PASSWORD = "The password is incorrect",
    NO_CHANGE_WITH_SAME_PASSWORD = "You change the password with the same password",

    /**     Authorization     **/
    NO_AUTHORIZATION = "No authorization",
    INVALID_TOKEN = "Your authorization bearer token is not valid",

    /**     Database     **/
    MODIF_DATABASE = "An error when modifying the data in the database",
    FIND_DATABASE = "An error when finding the data in the database",
    DELETE_USER_DATABASE = "An error when deleting an user in the database",

    /**     Role     **/
    CANT_ASSIGN_ROLE = "You cannot assign this role to this user",
}
