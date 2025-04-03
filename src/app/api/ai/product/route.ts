import { ai } from "@/app/lib/ai";
import { logger } from "@/app/lib/logging";
import { auth } from "@/lib/auth";
import { streamText } from "ai";

export async function POST(req: Request): Promise<Response> {
	try {
		const session = await auth.api.getSession(req);
		if (!session) {
			return new Response("Unauthorized", { status: 401 });
		}

		const { prompt }: { prompt: string } = await req.json();

		logger.info("Génération réponse IA /api/ai/product");

		const result = streamText({
			model: ai.model,
			system: ai.systemPrompts.enhanceProductInformation,
			prompt,
			// biome-ignore lint/nursery/useExplicitType: ignore
			onError: (error: unknown) => {
				logger.error("Erreur génération réponse IA /api/ai/product", error);
			},
		});

		return result.toDataStreamResponse({
			getErrorMessage: errorHandler,
		});
	} catch (error) {
		logger.error("Erreur génération réponse IA /api/ai/product", error);
		return new Response("Internal Server Error", { status: 500 });
	}
}

function errorHandler(error: unknown): string {
	logger.error("Erreur génération réponse IA /api/ai/product", error);
	if (error == null) {
		return "unknown error";
	}

	if (typeof error === "string") {
		return error;
	}

	if (error instanceof Error) {
		return error.message;
	}

	return JSON.stringify(error);
}
