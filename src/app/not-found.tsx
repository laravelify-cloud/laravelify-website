import Link from 'next/link';

export default function NotFound() {
    return (
        <main className="grid min-h-screen place-items-center px-4 text-center">
            <div>
                <img src="/brand/mark.svg" alt="" className="mx-auto size-14" />
                <h1 className="mt-6 text-3xl font-bold tracking-tight">Page not found</h1>
                <p className="mt-2 text-muted">This page does not exist, or it moved.</p>
                <Link href="/" className="btn btn-primary mt-8">
                    Back to Laravelify
                </Link>
            </div>
        </main>
    );
}
