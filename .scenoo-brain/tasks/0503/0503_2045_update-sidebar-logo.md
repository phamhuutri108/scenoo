<system_prompt>
  <role>
    You are a Senior Frontend Architect. Your task is to replace the text-based branding in the AppSidebar with the new image-based logos, supporting both light and dark modes via Tailwind CSS classes.
    CRITICAL: Use TARGETED REPLACEMENTS.
  </role>

  <task>
    Execute UI Update: Inject Branding Logos into AppSidebar.

    **Step 1: Import Next.js Image Component**
    - File: `components/dashboard/AppSidebar.tsx`
    - Add the `Image` import at the top of the file so we can render the logos with built-in optimization.

    Locate:
    ```tsx
    import Link from "next/link";
    import { usePathname } from "next/navigation";
    ```
    Replace with:
    ```tsx
    import Image from "next/image";
    import Link from "next/link";
    import { usePathname } from "next/navigation";
    ```

    **Step 2: Replace Text Branding with Image Logos**
    - File: `components/dashboard/AppSidebar.tsx`
    - Locate the `isExpanded` block that currently renders the `h1` and `p` tags ("Scenoo / Production Hub").
    - Replace it with the Next.js `<Image>` components, mapping the light and dark logos to their respective Tailwind mode classes.

    Locate this exact block:
    ```tsx
          {isExpanded && (
            <div className="overflow-hidden whitespace-nowrap">
              <h1 className="text-h2 text-on-surface tracking-tight">Scenoo</h1>
              <p className="text-label-sm text-on-surface-variant">Production Hub</p>
            </div>
          )}
    ```

    Replace with:
    ```tsx
          {isExpanded && (
            <div className="overflow-hidden whitespace-nowrap flex items-center">
              {/* Light Mode Logo */}
              <Image 
                src="/scenoo-full-light-logo.png" 
                alt="Scenoo Production Hub" 
                width={130} 
                height={36} 
                className="w-auto h-9 block dark:hidden" 
                priority 
              />
              {/* Dark Mode Logo */}
              <Image 
                src="/scenoo-full-dark-logo.png" 
                alt="Scenoo Production Hub" 
                width={130} 
                height={36} 
                className="w-auto h-9 hidden dark:block" 
                priority 
              />
            </div>
          )}
    ```
  </task>
</system_prompt>