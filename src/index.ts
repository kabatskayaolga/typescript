/* eslint-disable @typescript-eslint/no-unused-vars */
enum AwardsList {
  FIPRESCI = 'Fédération Internationale de la PRESse CInématographique', // Awards, given by the International Federation of Film Critics at various film festivals
  CannesFilmFestival = 'Cannes film festival', //  is one of the most important and selective film festivals with their prestigious prize the Palme d'Or.
  OFCS = 'Online Film Critics Society', // Awards
  GoldenGlobeAwards = 'Golden Globe Awards',
  IOFCP = 'International Online Film Critics', // Poll Awards
}
enum RateList {
  G = 'General Audiences', //All ages admitted.Nothing that would offend parents for viewing by children.
  PG = 'Parental Guidance Suggested', //Some material may not be suitable for children.Parents urged to give "parental guidance".May contain some material parents might not like for their young children.
  R = 'Restricted', // Under 17 requires accompanying parent or adult guardian.Contains some adult material.Parents are urged to learn more about the film before taking their young children with them.
  NC = 'Adults Only', // No one 17 and under admitted.Clearly adult.Children are not admitted.
}

enum DataFilterList {
  RATE = 'rate',
  YEAR = 'year',
  Awards = 'awards',
}

interface IFilmFilter {
  [DataFilterList.RATE]: RateList | undefined;
  [DataFilterList.YEAR]: number | undefined;
  [DataFilterList.Awards]: AwardsList[] | undefined;
}

abstract class Filter {
  protected values: string[] = [];
  constructor(public name: string) { }
  abstract applySearchValue(values: string[]): void;
}

abstract class FilterTo extends Filter {
  protected filter: IFilmFilter = {
    rate: undefined,
    year: 4566,
    awards: undefined,
  };
  abstract applyFiltersValue(filter: DataFilterList, filterTo: IFilmFilter[DataFilterList]): void;
}

class Film extends FilterTo {
  constructor(
    name: string,
    public year: number,
    public rate: RateList,
    public awards: AwardsList[]
  ) {
    super(name);
  }

  applyFiltersValue(filter: DataFilterList, filterTo: IFilmFilter[DataFilterList]): void {
    // как ограничить filterTo взависимости от filter???????
    this.filter = {
      ...this.filter,
      [filter]: filterTo,
    };
  }

  applySearchValue(values: string[]): void { }
}

class Category extends Filter {
  films: Film[] = [];

  searchValue: Film[] = [];

  applySearchValue(values: string[]): void { }

  addFilm(film: Film): void {
    this.films.push(film);
  }
}
