import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';

const socialLinks = [
  { name: 'Instagram', href: '#' },
  { name: 'Facebook', href: '#' },
  { name: 'Reddit', href: '#' },
];

export default function Footer() {
  return (
    <footer className="w-full bg-yellow-400 text-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Column 1: Copyright & Privacy */}
          <div className="space-y-4">
            <p className="font-semibold text-xs">© 2024 Trucks on flex.</p>
            <a href="#" className="text-xs hover:underline">Privacy Policy</a>
          </div>

          {/* Column 2: Contact & Socials */}
          <div className="space-y-4">
            <a href="mailto:hello@trucksonflex.com" className="font-semibold text-xs hover:underline">hello@trucksonflex.com</a>
            <ul className="space-y-2">
              {socialLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="flex items-center text-xs hover:underline">
                    <ArrowRight className="w-4 h-4 mr-2" />
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Newsletter */}
          <div className="space-y-4">
            <p className="font-semibold text-xs">Join our newsletter to stay up to date</p>
            <form className="flex items-center">
              <Input 
                type="email" 
                placeholder="EMAIL ADDRESS"
                className="bg-white text-black placeholder-gray-500 rounded-full rounded-r-none border-none focus:ring-0"
              />
              <Button type="submit" className="bg-black text-white rounded-full rounded-l-none hover:bg-gray-800 px-6">
                SUBMIT
              </Button>
            </form>
            <div className="flex items-center space-x-2 mt-2">
              <Checkbox id="marketing-agree" className="border-black data-[state=checked]:bg-black data-[state=checked]:text-white" />
              <label htmlFor="marketing-agree" className="text-xs font-mono">I AGREE TO RECEIVE MARKETING COMMUNICATIONS</label>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-black py-3">
        <h1 className="text-[8vw] md:text-[10vw] lg:text-[12vw] font-extrabold text-yellow-400 text-center leading-none whitespace-nowrap">
          Trucks on flex
        </h1>
      </div>
    </footer>
  );
}
