const contacts = (contact) => {
  switch (contact) {
    case 'whatsapp':
      return 'https://api.whatsapp.com/send?phone=6285691924390';
    case 'instagram':
      return 'https://instagram.com/alphabet.incubator';
    case 'email':
      return 'mailto:ai_indonesia@alphabetincubator.id?subject=Help and Feedback&body=Describe your problem or feedback 🚀';
  }
};

export default contacts;
