import Link from 'next/link'

export default function Header() {
    return (
        <header className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <Link href="/" className="text-2xl font-bold text-gray-900">
                            My Blog
                        </Link>
                    </div>
                    <nav className="flex space-x-8">
                        <Link href="/" className="text-gray-700 hover:text-gray-900">
                            Home
                        </Link>
                        <Link href="/blog" className="text-gray-700 hover:text-gray-900">
                            Blog
                        </Link>
                    </nav>
                </div>
            </div>
        </header>
    )
}