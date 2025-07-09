{
  inputs.nixpkgs.url = "github:nixos/nixpkgs";
  outputs = {nixpkgs, ...}: let
    system = "x86_64-linux";
    pkgs = nixpkgs.legacyPackages.${system};
  in {
    devShells.${system}.default = pkgs.mkShell {
      nativeBuildInputs = with pkgs; [
        tree-sitter
        nodejs_24
        typescript-language-server
      ];
    };
  };
}
