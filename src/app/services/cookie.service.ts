/** 
* Service para acesso a dados gravados localmente
*     A versão abaixo usa "localStorage" para manter os dados no dispositivo.
*     Você pode alterar para outro método como "cookie", "session", "indexed DB", etc.
*     Pode-se ainda, usar vários métodos, testando a disponibilidade de cada um.
*
* @author Por Luferat
*/

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookieService {

  constructor() { }

  // 1.1) Método que grava dados no device
  cookieSet(key: string, value: string) {
    // console.log('Salvando', key, value);

    // Gravando no 'localStorage' do navegador
    localStorage.setItem(key, value);

    // Verifica se gravação foi bem sucedida
    return new Promise((res, rej) => {

      // Lê os dados gravados
      if (localStorage.getItem(key) == value) {

        // Se gravou, retorna 'true'
        res(true);
      } else {

        // Se não gravou, retorna erro
        rej(`Data store has fail!`);
      }
    });
  }

  // 1.2) Lê dados do device
  cookieGet(key: string) {
    // console.log('Lendo', key);

    // Verifica se leitura foi bem sucedida
    return new Promise((res, rej) => {

      // Lê chave do 'localStorage'
      var cookieData = localStorage.getItem(key);

      // Se obteve os dados
      if (cookieData) {

        // Retorna os dados lidos
        res(cookieData);

        // Se falhou
      } else {

        // Retorna com erro
        rej(`Data read has fail!`);
      }
    });
  }

  // 1.3) Apaga dados do device
  cookieDelete(key: string) {

    // Apaga dados do 'localStorage'
    localStorage.removeItem(key);

    // Verifica se dados foram apagados
    return new Promise((res, rej) => {

      // Lê chave do 'localStorage'
      var cookieData = localStorage.getItem(key);

      // Se não obteve os dados
      if (!cookieData) {

        // Retorna com sucesso
        res(true);

        // Se obteve dados
      } else {

        // Retorna com erro
        rej(`Datas has no deleted!`);
      }
    });
  }
}
