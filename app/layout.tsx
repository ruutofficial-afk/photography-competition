import type { Metadata } from 'next';
import { Inter, Playfair_Display, Rubik, Yellowtail } from 'next/font/google';
import './globals.css';

// Load fonts matching the poster's typography pairings
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const rubik = Rubik({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});

const yellowtail = Yellowtail({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-script',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Photography Contest - The Anti Aesthetic | ṚUUT Community',
  description: 'Submit your raw and edited entries for the "The Anti Aesthetic" photography contest hosted by ṚUUT. View rules, guidelines, and submit your entry online.',
  keywords: 'photography contest, anti aesthetic, community event, submission platform, ṚUUT, raw photo, photo editing',
  authors: [{ name: 'ṚUUT Brand Community' }],
  openGraph: {
    title: 'Photography Contest - The Anti Aesthetic | ṚUUT',
    description: 'Showcase your raw and edited photos for our community contest. Submit your entry online now!',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${rubik.variable} ${yellowtail.variable} h-full scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="min-h-full font-sans antialiased text-[#664436] bg-[#E6DED1]" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
