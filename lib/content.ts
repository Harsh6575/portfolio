const GITHUB_RAW_URL = "https://raw.githubusercontent.com/Harsh6575/portfolio-data/main";

export async function fetchContentData(fileName: string) {
  try {
    const response = await fetch(`${GITHUB_RAW_URL}/data/${fileName}.json`, {
      next: { revalidate: 3600 }, // 1 hour cache
    });

    if (!response.ok) throw new Error(`Failed to fetch ${fileName}`);

    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${fileName}:`, error);
    return null;
  }
}
