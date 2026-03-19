

## Problem

The logo in the sidebar header looks blurry and unprofessional. The `h-9 w-9` (36x36px) container is too small for crisp rendering, and the image may be getting poorly scaled. The reference screenshot shows a clean, sharp icon with proper spacing.

## Plan

**File: `src/components/AppSidebar.tsx`**

1. Increase icon container from `h-9 w-9` to `h-10 w-10` (40px) for sharper rendering at a natural size
2. Add `image-rendering: auto` and remove the `ring` overlay that adds visual noise
3. Use `rounded-lg` instead of `rounded-xl` to match the reference more closely
4. Bump title to `text-base` (16px) and subtitle to `text-[11px]` for better hierarchy
5. Fix the initials in footer from "DG" to "EP" (Eliseu Pena)
6. Add `object-contain` instead of `object-cover` to prevent cropping/distortion

These are small CSS/class tweaks in one file only.

