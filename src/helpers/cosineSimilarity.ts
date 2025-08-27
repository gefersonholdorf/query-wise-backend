export function cosineSimilarity(vecA: number[], vecB: number[]): number {
	const dotProduct = vecA.reduce((acc, val, i) => acc + val * vecB[i], 0);
	const magnitudeA = Math.sqrt(vecA.reduce((acc, val) => acc + val ** 2, 0));
	const magnitudeB = Math.sqrt(vecB.reduce((acc, val) => acc + val ** 2, 0));
	return dotProduct / (magnitudeA * magnitudeB);
}
