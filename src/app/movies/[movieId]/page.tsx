export default function Movie({ params }: { params: { movieId: string } }) {
    return (
        <h1>this is dynamic movie page {params.movieId}</h1>
    )
}