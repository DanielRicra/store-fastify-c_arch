export class PaginationDTO {
  private constructor(public page: number, public perPage: number) {}

  /**
   *
   * @param {Object} object
   * @returns {PaginationDTO}
   */
  static create(object: { [key: string]: any }): PaginationDTO {
    let { page = 1, perPage = 5 } = object;

    if (isNaN(page) || Number(page) < 1) page = 1;
    if (isNaN(perPage) || Number(perPage) < 1) perPage = 5;

    return new PaginationDTO(Number(page), Number(perPage));
  }
}
