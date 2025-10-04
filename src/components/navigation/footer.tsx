export async function Footer() {
    return (
        <footer className="w-full py-4 bg-sky-200 text-center text-sm text-sky-700">
            <p>Make with ❤️ by CodeXplore</p>
            &copy; {new Date().getFullYear()} AEROGUARD. All rights reserved.
        </footer>
    );
}