import { useTheme } from "@/components/theme-provider.tsx";

export default function LoopInLogo({ size = 48 }: { size?: number }) {
  const { theme } = useTheme();

  const fillColor = theme === "dark" ? "#FFFFFF" : "#000000";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="transition-colors"
    >
      <path
        d="M256 0C114.836 0 0 114.836 0 256C0 397.164 114.836 512 256 512C397.164 512 512 397.164 512 256C512 114.836 397.164 0 256 0ZM256 480C132.288 480 32 379.712 32 256C32 132.288 132.288 32 256 32C379.712 32 480 132.288 480 256C480 379.712 379.712 480 256 480Z"
        fill={fillColor}
      />
      <circle cx="256" cy="256" r="96" fill={fillColor} />
      <path
        d="M256 160C229.49 160 204.774 169.597 186.745 186.745C169.597 204.774 160 229.49 160 256C160 282.51 169.597 307.226 186.745 325.255C204.774 342.403 229.49 352 256 352C282.51 352 307.226 342.403 325.255 325.255C342.403 307.226 352 282.51 352 256C352 229.49 342.403 204.774 325.255 186.745C307.226 169.597 282.51 160 256 160ZM256 320C229.49 320 208 298.51 208 272C208 245.49 229.49 224 256 224C282.51 224 304 245.49 304 272C304 298.51 282.51 320 256 320Z"
        fill={fillColor}
      />
    </svg>
  );
}
