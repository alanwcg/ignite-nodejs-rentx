interface ISendMailDTO {
  to: string;
  subject: string;
  variables: {
    [key: string]: string;
  };
  path: string;
}

export default ISendMailDTO;
