interface IUserResponseDTO {
  id: string;
  name: string;
  email: string;
  avatar: string;
  avatar_url(): string;
  driver_license: string;
}

export default IUserResponseDTO;
