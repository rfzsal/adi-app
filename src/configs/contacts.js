const contacts = (contact) => {
  switch (contact) {
    case 'whatsapp':
      return 'https://api.whatsapp.com/send?phone=6285691924390';
    case 'instagram':
      return 'https://instagram.com/alphabet.incubator';
    case 'email':
      return 'mailto:support.bigboyz@alphabetincubator.id?subject=Help and Feedback';
  }
};

export default contacts;
