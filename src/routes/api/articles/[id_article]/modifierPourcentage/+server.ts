import { host } from '$lib/Api/config';
import { json as jsonResponse } from '@sveltejs/kit'

const apiRoute = "articles"

async function savePourcentage(id_article: number, nouvelleValeur: number) {
  try {
    const response = await fetch(`${host}/${apiRoute}/${id_article}/modifierPourcentage`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        new_pourcentage: nouvelleValeur,
      }),
    });

    if (response.ok) {
      console.log("Modifications sauvegardées avec succès !");
      const json = await response.json();
      return jsonResponse(json)
    } else {
      throw new Error(response.statusText);
    }
  } catch (error) {
    return jsonResponse('Backend error', { status: 500 })
  }
}

export async function POST({ request, params }) {
  const { id_article, nouvelleValeur } = await request.json();
  if (params.id_article != id_article)
    return jsonResponse('params.id_article != id_article', { status: 400 })
  return savePourcentage(id_article, nouvelleValeur)
}