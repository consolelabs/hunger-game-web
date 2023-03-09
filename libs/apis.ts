import { Game, MatchMaking, MoveType, Player } from "../types/game";
import fetcher from "./fetcher";

export const BASE_SITE = process.env.BASE_SITE || "hunger.fly.dev";
export const BASE_URL = process.env.BASE_URL || `https://${BASE_SITE}`;

export interface Response<T> {
  data: T;
}

// keys for swr
export const GET_PATHS = {
  game: "/game",
  gameDetail: (id: string) => `/game/${id}`,
};

class Client {
  headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  public createNewGame(game = null) {
    return fetcher<Response<Game>>(`${BASE_URL}/api/game`, {
      method: "POST",
      headers: {
        ...this.headers,
      },
      body: JSON.stringify({
        game,
      }),
    });
  }

  public getGameDetail(id: string) {
    return fetcher<Response<Game>>(`${BASE_URL}/api/game/${id}`, {
      headers: {
        ...this.headers,
      },
    });
  }

  public getGameList() {
    return fetcher<Response<Game[]>>(`${BASE_URL}/api/game`, {
      headers: {
        ...this.headers,
      },
    });
  }

  public joinGame(id: string, name?: string) {
    return fetcher<Response<Player>>(`${BASE_URL}/api/game/${id}/player`, {
      method: "POST",
      headers: {
        ...this.headers,
      },
      body: JSON.stringify({
        name,
      }),
    });
  }

  public startGame(id: string, token: string) {
    return fetcher<Response<Game>>(`${BASE_URL}/api/game/${id}/start`, {
      method: "POST",
      headers: {
        ...this.headers,
      },
      body: JSON.stringify({
        token,
      }),
    });
  }

  public submitStep(gameId: string, token: string, action: MoveType) {
    return fetcher<Response<Game>>(`${BASE_URL}/api/game/${gameId}/round`, {
      method: "POST",
      headers: {
        ...this.headers,
      },
      body: JSON.stringify({
        token,
        action,
      }),
    });
  }

  public findAMatch({ name }: { name: string }) {
    return fetcher<MatchMaking>(`${BASE_URL}/api/match-making`, {
      method: "POST",
      headers: {
        ...this.headers,
      },
      body: JSON.stringify({
        name,
      }),
    });
  }
}

const client = new Client();

export { client };
