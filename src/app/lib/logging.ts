/**
 * error log de niveau ERROR.
 * @param err erreur à affcher.
 */
// biome-ignore lint/suspicious/noExplicitAny: logging.
function error(err: any): void {
	const now = new Date();

	if (err instanceof Error) {
		// biome-ignore lint/suspicious/noConsole: logging.
		console.error(`[${now.toISOString()}] [ERROR]`, err, err.stack);
	} else {
		// biome-ignore lint/suspicious/noConsole: logging.
		console.error(`[${now.toISOString()}] [ERROR]`, err);
	}
}

/**
 * info log de niveau INFO.
 * @param msg message à afficher.
 */
// biome-ignore lint/suspicious/noExplicitAny: logging.
function info(msg: any): void {
	const now = new Date();
	// biome-ignore lint/suspicious/noConsole: logging.
	console.log(`[${now.toISOString()}] [INFO]`, msg);
}

export const logger = {
	error,
	info,
};
