export const PORT = process.env.PORT || 3030;
export const IsPROD = process.env.NODE_ENV === 'production';
export const ProdLogFormate = ':id :remote-addr - :remote-user [:date [web]] " :method :url HTTP/:http-version"  :status  :res[content-length]';
export const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})$/g;
export const urlRegex = /^https?:\/\/(www\.)?[\w]{2,256}\.[a-z]{2,6}\b([-\w@:%_\+.~#?&//=]*)$/ig;

export const PAGINATE = 20; // records per page
