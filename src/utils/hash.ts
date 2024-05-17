import bcrypt from 'bcrypt';

export default class Encrypt {
  public encryptPassword = (password: string) => {
    const salt = bcrypt.genSaltSync(5);
    const encryptedPassword = bcrypt.hashSync(password, salt);
    return encryptedPassword;
  };

  public checkPassword = (password: string, passwordDb: string) =>
    bcrypt.compareSync(password, passwordDb);
}
