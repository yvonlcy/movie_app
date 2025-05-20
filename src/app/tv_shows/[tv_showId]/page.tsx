export default function TVShow({ params }: { params: { tv_showId: string } }) {
    return (
        <h1>this is dynamic tv show page {params.tv_showId}</h1>
    );
}
