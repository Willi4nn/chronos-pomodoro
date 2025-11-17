import { Link } from "react-router-dom";

type ReactLinkProps = {
  children: React.ReactNode
  href: string
} &
  React.ComponentProps<'a'>;

export function RouterLink({ children, href, ...props }: ReactLinkProps) {
  return (  
    <Link to={href} {...props}>{children}</Link>
  )
}