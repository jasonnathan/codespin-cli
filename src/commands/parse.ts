import { promises as fs } from "fs";
import { extractFilesToDisk } from "../fs/extractFilesToDisk.js";
import { extractCode } from "../prompts/extractCode.js";

type ParseArgs = {
  filename: string;
  write: boolean | undefined;
  exec: string | undefined;
  config: string | undefined;
  baseDir: string | undefined;
};

export async function parse(args: ParseArgs): Promise<void> {
  const llmResponse = await fs.readFile(args.filename, "utf-8");
  const files = extractCode(llmResponse);

  if (args.write) {
    const extractResult = await extractFilesToDisk(
      args.baseDir || process.cwd(),
      { files },
      args.exec
    );
    const generatedFiles = extractResult.filter((x) => x.generated);
    const skippedFiles = extractResult.filter((x) => !x.generated);

    if (generatedFiles.length) {
      console.log(`Generated ${generatedFiles.map((x) => x.file).join(", ")}.`);
    }
    if (skippedFiles.length) {
      console.log(`Skipped ${skippedFiles.map((x) => x.file).join(", ")}.`);
    }
  } else {
    for (const file of files) {
      const header = `FILE: ${file.name}`;
      console.log(header);
      console.log("-".repeat(header.length));
      console.log(file.contents);
      console.log();
    }
  }
}