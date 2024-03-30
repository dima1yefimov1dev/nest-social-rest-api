import { Injectable } from '@nestjs/common';

@Injectable()
export class PaginationService {
  paginate(items: any[], currentPage: number = 1, perPage: number = 10): any[] {
    const start = (currentPage - 1) * perPage;
    const end = start + perPage;
    return items.slice(start, end);
  }
}
