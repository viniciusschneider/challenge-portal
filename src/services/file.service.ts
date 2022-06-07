import http from "@/common/http";
import { IInputFile } from "@/interfaces/input-file.interface";

export class FileService {
  async createTeamImage(image: File): Promise<IInputFile> {
    const formData = new FormData();
    formData.append('image', image);
    return http.post<IInputFile>('images/teams', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
  }
}

export default new FileService();
