import { notFound } from "next/navigation";

export default async function Page({
	params,
}: {
	params: Promise<{ productId: string }>;
}): Promise<React.JSX.Element> {
	const { productId } = await params;
	if (!productId) {
		notFound();
	}

	return <div>product id: {productId}</div>;
}
