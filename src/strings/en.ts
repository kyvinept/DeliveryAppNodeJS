const en = {
  common: {
    notAuthorized: 'Not authorized',
    validationError: 'Validation error',
    unknownError: 'Unknown error!',
    forbidden: 'You do not have access.',
  },
  user: {
    emailAlreadyInUse: 'Such email is already in use',
    isNotRegistered: "Such user hasn't been registered.",
    wrongPassword: 'Wrong password',
    tokenWasExpired:
      'This token is not active now! Please resend the mail again.',
  },
  restaurant: {
    restaurantAlreadyExist: 'This name is already taken.',
    restaurantNotFound: 'This restaurant was not found.',
  },
  dish: {
    dishAlreadyExist: 'This name is already taken.',
    dishNotFound: 'This dish was not found.',
  },
  image: {
    format: 'Only images are allowed',
    imageNotFound: 'This image was not found.',
    imageHasNotBeenUploaded:
      'This image was not found on our server. Please upload firstly and try again.',
  },
  order: {
    orderNotFound: 'This order was not found.',
  },
  mail: {
    forgetPasswordSubject: 'Recovering account',
    forgetPasswordText: (token: string) => `Recover there ${token}`,
    emailHasBeenSent: 'The mail with details has been successfully sent',
  },
  chat: {
    idsTheSame: 'You cannot create chat with your user id',
    notFound: 'This chat was not found.',
  },
  message: {
    notFound: 'This message was not found.',
  },
  chatSocket: {
    successfullyJoinedChat: 'You have successfully joined to chat',
    successfullyLeavedChat: 'You have successfully leaved to chat',
    messageSaved: 'Message saved',
  },
};

export default en;
