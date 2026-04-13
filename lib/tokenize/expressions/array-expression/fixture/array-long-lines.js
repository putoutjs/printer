const commands = [
    'mv ~/.ghcup {{ directorio }}/ghcup',
    'ln -fs {{ directorio }}/ghcup/ghc/{{ version }}/lib/ghc-{{ version }}/bin/ghc {{ directorio }}/../bin/ghc',
];